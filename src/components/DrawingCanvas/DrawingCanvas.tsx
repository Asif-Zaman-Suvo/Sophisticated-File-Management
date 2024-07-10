"use client";
import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Rect, Circle, Text } from "react-konva";
import {
  Box,
  Button,
  Slider,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

const DrawingCanvas = () => {
  const [tool, setTool] = useState<
    "pen" | "rect" | "circle" | "eraser" | "text"
  >("pen");
  const [lineWidth, setLineWidth] = useState(4);
  const [color, setColor] = useState("#000000");
  const [shapes, setShapes] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState<any>(null);
  const [textValue, setTextValue] = useState("");
  const [isEditingText, setIsEditingText] = useState(false);
  const [alignmentGuides, setAlignmentGuides] = useState<{
    horizontal: any | null;
    vertical: any | null;
  }>({ horizontal: null, vertical: null });
  const stageRef = useRef(null);

  const snapSettings = {
    snapDistance: 10, // Adjust as needed
    snapToGrid: true, // Whether to snap to a grid
    gridSize: 20, // Size of the grid for snapping (if used)
  };

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    const shape = {
      tool,
      color: tool === "eraser" ? "#FFFFFF" : color,
      lineWidth,
      points: [pos.x, pos.y],
      id: shapes.length + 1,
      text: tool === "text" ? textValue : "",
    };
    setCurrentShape(shape);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || tool === "text") return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastShape = currentShape;
    if (tool === "pen" || tool === "eraser") {
      lastShape.points = lastShape.points.concat([point.x, point.y]);
    } else {
      const start = { x: lastShape.points[0], y: lastShape.points[1] };
      if (tool === "rect") {
        lastShape.width = point.x - start.x;
        lastShape.height = point.y - start.y;
      } else if (tool === "circle") {
        lastShape.radius = Math.sqrt(
          Math.pow(point.x - start.x, 2) + Math.pow(point.y - start.y, 2)
        );
      }
    }

    // Snapping logic
    if (snapSettings.snapToGrid) {
      const snapX =
        Math.round(point.x / snapSettings.gridSize) * snapSettings.gridSize;
      const snapY =
        Math.round(point.y / snapSettings.gridSize) * snapSettings.gridSize;
      const horizontalGuide = {
        x1: 0,
        y1: snapY,
        x2: stage.width(),
        y2: snapY,
      };
      const verticalGuide = { x1: snapX, y1: 0, x2: snapX, y2: stage.height() };
      setAlignmentGuides({
        horizontal: horizontalGuide,
        vertical: verticalGuide,
      });
    } else {
      setAlignmentGuides({ horizontal: null, vertical: null });
    }

    setCurrentShape({ ...lastShape });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (tool === "text" && currentShape) {
      setShapes([...shapes, currentShape]);
      setCurrentShape(null);
      setTextValue("");
    } else if (currentShape) {
      setShapes([...shapes, currentShape]);
      setCurrentShape(null);
    }

    // Clear alignment guides
    setAlignmentGuides({ horizontal: null, vertical: null });
  };

  const handleClear = () => {
    setShapes([]);
  };

  const handleDragEnd = (e: any, id: number) => {
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === id) {
        return { ...shape, points: [e.target.x(), e.target.y()] };
      }
      return shape;
    });
    setShapes(updatedShapes);
  };

  const handleTextDblClick = (e: any, id: number) => {
    const shape = shapes.find((s) => s.id === id);
    if (shape && shape.tool === "text") {
      setTextValue(shape.text);
      setIsEditingText(true);
      const stage = stageRef.current;
      const textPosition = shape.points;
      setCurrentShape({ ...shape, points: [textPosition[0], textPosition[1]] });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleTextSubmit = () => {
    if (currentShape) {
      const updatedShapes = shapes.map((shape) => {
        if (shape.id === currentShape.id) {
          return { ...shape, text: textValue };
        }
        return shape;
      });
      setShapes(updatedShapes);
      setIsEditingText(false);
      setTextValue("");
      setCurrentShape(null);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">Drawing Canvas</Typography>
      <Stage
        ref={stageRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        style={{ border: "1px solid #000" }}
      >
        <Layer>
          {/* Render existing shapes */}
          {shapes.map((shape, i) => (
            <React.Fragment key={i}>
              {shape.tool === "pen" || shape.tool === "eraser" ? (
                <Line
                  points={shape.points}
                  stroke={shape.color}
                  strokeWidth={shape.lineWidth}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  draggable
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                />
              ) : shape.tool === "rect" ? (
                <Rect
                  x={shape.points[0]}
                  y={shape.points[1]}
                  width={shape.width}
                  height={shape.height}
                  stroke={shape.color}
                  strokeWidth={shape.lineWidth}
                  draggable
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                />
              ) : shape.tool === "circle" ? (
                <Circle
                  x={shape.points[0]}
                  y={shape.points[1]}
                  radius={shape.radius}
                  stroke={shape.color}
                  strokeWidth={shape.lineWidth}
                  draggable
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                />
              ) : (
                <Text
                  x={shape.points[0]}
                  y={shape.points[1]}
                  text={shape.text}
                  fontSize={shape.lineWidth * 3}
                  fill={shape.color}
                  draggable
                  onDblClick={(e) => handleTextDblClick(e, shape.id)}
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                />
              )}
            </React.Fragment>
          ))}

          {/* Render alignment guides */}
          {alignmentGuides.horizontal && (
            <Line
              points={[
                alignmentGuides.horizontal.x1,
                alignmentGuides.horizontal.y1,
                alignmentGuides.horizontal.x2,
                alignmentGuides.horizontal.y2,
              ]}
              stroke="#FF0000"
              strokeWidth={1}
              dash={[3, 3]}
            />
          )}
          {alignmentGuides.vertical && (
            <Line
              points={[
                alignmentGuides.vertical.x1,
                alignmentGuides.vertical.y1,
                alignmentGuides.vertical.x2,
                alignmentGuides.vertical.y2,
              ]}
              stroke="#FF0000"
              strokeWidth={1}
              dash={[3, 3]}
            />
          )}
        </Layer>
      </Stage>
      <Box display="flex" alignItems="center" mt={2}>
        <Button variant="contained" onClick={handleClear}>
          Clear
        </Button>
        <FormControl variant="outlined" style={{ marginLeft: 10 }}>
          <InputLabel id="tool-select-label">Tool</InputLabel>
          <Select
            labelId="tool-select-label"
            value={tool}
            onChange={(e) =>
              setTool(
                e.target.value as "pen" | "rect" | "circle" | "eraser" | "text"
              )
            }
            label="Tool"
          >
            <MenuItem value="pen">Pen</MenuItem>
            <MenuItem value="rect">Rectangle</MenuItem>
            <MenuItem value="circle">Circle</MenuItem>
            <MenuItem value="eraser">Eraser</MenuItem>
            <MenuItem value="text">Text</MenuItem>
          </Select>
        </FormControl>
        {tool !== "eraser" && tool !== "text" && (
          <>
            <Typography style={{ marginLeft: 10 }}>Color:</Typography>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ marginLeft: 10 }}
            />
          </>
        )}
        {tool === "text" && (
          <>
            <TextField
              label="Text"
              value={textValue}
              onChange={handleTextChange}
              variant="outlined"
              style={{ marginLeft: 10 }}
            />
            <Button
              variant="contained"
              onClick={handleTextSubmit}
              style={{ marginLeft: 10 }}
              disabled={!isEditingText}
            >
              Update Text
            </Button>
          </>
        )}
        <Typography style={{ marginLeft: 10 }}>Line Width:</Typography>
        <Slider
          value={lineWidth}
          onChange={(e, newValue) => setLineWidth(newValue as number)}
          min={1}
          max={20}
          style={{ width: 200, marginLeft: 10 }}
        />
      </Box>
    </Box>
  );
};

export default DrawingCanvas;
