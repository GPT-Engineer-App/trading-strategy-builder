import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  INDICATOR: "indicator",
  RULE: "rule",
};

const DraggableItem = ({ type, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 m-2 border rounded ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {name}
    </div>
  );
};

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.INDICATOR, ItemTypes.RULE],
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 m-2 border-dashed border-2 rounded ${isOver ? "bg-gray-200" : "bg-white"}`}
      style={{ minHeight: "200px" }}
    >
      {isOver ? "Release to drop" : "Drag items here"}
    </div>
  );
};

const StrategyBuilder = () => {
  const [items, setItems] = useState([]);

  const handleDrop = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Strategy Builder</h2>
      <div className="flex">
        <div className="w-1/3">
          <h3 className="text-lg mb-2">Indicators</h3>
          <DraggableItem type={ItemTypes.INDICATOR} name="Moving Average" />
          <DraggableItem type={ItemTypes.INDICATOR} name="RSI" />
          <h3 className="text-lg mb-2">Rules</h3>
          <DraggableItem type={ItemTypes.RULE} name="Buy Rule" />
          <DraggableItem type={ItemTypes.RULE} name="Sell Rule" />
        </div>
        <div className="w-2/3">
          <DropZone onDrop={handleDrop} />
          <div className="mt-4">
            <h3 className="text-lg mb-2">Strategy</h3>
            {items.map((item, index) => (
              <div key={index} className="p-2 m-2 border rounded">
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Backtest = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Backtest</h2>
      <Button>Run Backtest</Button>
    </div>
  );
};

const Index = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen w-screen p-4">
        <Tabs defaultValue="builder">
          <TabsList>
            <TabsTrigger value="builder">Strategy Builder</TabsTrigger>
            <TabsTrigger value="backtest">Backtest</TabsTrigger>
          </TabsList>
          <TabsContent value="builder">
            <Card>
              <CardHeader>
                <CardTitle>Visual Algorithmic Trading Strategy Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <StrategyBuilder />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="backtest">
            <Card>
              <CardHeader>
                <CardTitle>Backtest Your Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <Backtest />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DndProvider>
  );
};

export default Index;