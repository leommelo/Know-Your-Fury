import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function DragAndDropLista({ onListaAtualizada, jogos }) {
  const [itens, setItens] = useState(jogos);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setItens(jogos);
  }, [jogos]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = itens.findIndex((i) => i.id === active.id);
    const newIndex = itens.findIndex((i) => i.id === over.id);

    const newItens = arrayMove([...itens], oldIndex, newIndex);
    setItens(newItens);
    
    onListaAtualizada(newItens);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={itens.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div style={{ width: 300, marginLeft: 70, marginTop: 10 }}>
          {itens.map((item, index) => (
            <SortableItem key={item.id} id={item.id} nome={item.nome} prioridade={index + 1}/>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ id, nome, prioridade }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    paddingInline: 20,
    marginBottom: 0,
    border: "1px solid #000000",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    cursor: "grab",
    color: "#000000",
    fontFamily: "Lacquer, sans-serif",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "1.2rem",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p className="game">{nome}</p>
      <p className="game">{prioridade}º</p>
    </div>
  );
}