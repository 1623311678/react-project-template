import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface IStyle {
  [attr: string]: string;
}
interface DragComponnetProps {
  data: any[];
  setCreateGroupData: Function;
  draggable?: boolean;
  style?: IStyle;
  render: (item: any, index: number) => React.ReactElement;
}

export default function DragComponnet(props: DragComponnetProps) {
  const { data, render, setCreateGroupData, style } = props;
  // const [dragData, setDragData] = useState(data);
  function onDragEnd(result) {
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const isRealChange = startIndex !== endIndex;
    if (isRealChange) {
      const [removed] = data.splice(startIndex, 1);
      data.splice(endIndex, 0, removed);
      setCreateGroupData([...data]);
    }
  }
  function renderChildren(item, index) {
    return render(item, index);
  }
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? (style?.background || "#e7efed") : style?.background || "#d2e8e3"
  });
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: "12px 16px 0px 16px",
    display: "flex",
    width: '100%',
    // change background colour if dragging
    // styles we need to apply on draggables
    ...draggableStyle,
    ...style,
    background: isDragging ? "#d2e8e3" : style?.itemBackground || "#F9FAFC"
  });
  // useEffect(() => {
  //   setDragData(props.data);
  // }, [props.data]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {props.draggable &&
              data.map((item, index) => (
                <div key={item.title || String(index)} style={{ marginBottom: 10}}>
                  <Draggable
                    draggableId={String(index)}
                    key={String(index)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        key={String(index)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div
                          style={{ lineHeight: "40px", marginRight: "10px" }}
                        >
                          <svg
                            width="7px"
                            height="14px"
                            viewBox="0 0 7 14"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>拖动</title>
                            <g
                              id="后台"
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <g
                                id="画板"
                                transform="translate(-151.000000, -735.000000)"
                                fill="#C7D0DA"
                                fill-rule="nonzero"
                              >
                                <path
                                  d="M156.741152,746.486418 C157.185923,746.471403 157.603284,746.707543 157.829979,747.102471 C158.056674,747.497398 158.056674,747.988344 157.829979,748.383272 C157.603284,748.778199 157.185923,749.014339 156.741152,748.999324 C156.083812,748.977133 155.562066,748.421152 155.562066,747.742871 C155.562066,747.06459 156.083812,746.508609 156.741152,746.486418 L156.741152,746.486418 Z M152.217662,746.486418 C152.652691,746.486418 153.054674,746.725768 153.272188,747.114308 C153.489703,747.502848 153.489703,747.981549 153.272188,748.370088 C153.054674,748.758628 152.652691,748.997978 152.217662,748.997978 C151.545166,748.997978 151,748.435746 151,747.742198 C151,747.04865 151.545166,746.486418 152.217662,746.486418 Z M156.741152,740.743209 C157.185923,740.728194 157.603284,740.964334 157.829979,741.359262 C158.056674,741.754189 158.056674,742.245135 157.829979,742.640063 C157.603284,743.03499 157.185923,743.27113 156.741152,743.256115 C156.083812,743.233924 155.562066,742.677943 155.562066,741.999662 C155.562066,741.321381 156.083812,740.7654 156.741152,740.743209 L156.741152,740.743209 Z M152.217662,740.743209 C152.890158,740.743209 153.435324,741.305441 153.435324,741.998989 C153.435324,742.692537 152.890158,743.254769 152.217662,743.254769 C151.545166,743.254769 151,742.692537 151,741.998989 C151,741.305441 151.545166,740.743209 152.217662,740.743209 L152.217662,740.743209 Z M157.796244,735.628227 C158.013875,736.016975 158.013875,736.495932 157.796244,736.88468 C157.578613,737.273428 157.176414,737.512906 156.741152,737.512906 C156.068296,737.512906 155.522838,736.950373 155.522838,736.256453 C155.522838,735.562533 156.068296,735 156.741152,735 C157.176414,735 157.578613,735.239479 157.796244,735.628227 Z M152.217662,735 C152.890158,735 153.435324,735.562232 153.435324,736.25578 C153.435324,736.949328 152.890158,737.51156 152.217662,737.51156 C151.545166,737.51156 151,736.949328 151,736.25578 C151,735.562232 151.545166,735 152.217662,735 L152.217662,735 Z"
                                  id="拖动"
                                  transform="translate(154.500000, 742.000000) scale(-1, 1) translate(-154.500000, -742.000000) "
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                        {renderChildren(item, index)}
                      </div>
                    )}
                  </Draggable>
                </div>
              ))}
            {!props.draggable &&
              data.map((item, index) => (
                <div
                  ref={provided.innerRef}
                  key={String(index)}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(null, null)}
                >
                  <div style={{ lineHeight: "40px", marginRight: "10px" }}>
                    <svg
                      width="7px"
                      height="14px"
                      viewBox="0 0 7 14"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>拖动</title>
                      <g
                        id="后台"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          id="画板"
                          transform="translate(-151.000000, -735.000000)"
                          fill="#C7D0DA"
                          fill-rule="nonzero"
                        >
                          <path
                            d="M156.741152,746.486418 C157.185923,746.471403 157.603284,746.707543 157.829979,747.102471 C158.056674,747.497398 158.056674,747.988344 157.829979,748.383272 C157.603284,748.778199 157.185923,749.014339 156.741152,748.999324 C156.083812,748.977133 155.562066,748.421152 155.562066,747.742871 C155.562066,747.06459 156.083812,746.508609 156.741152,746.486418 L156.741152,746.486418 Z M152.217662,746.486418 C152.652691,746.486418 153.054674,746.725768 153.272188,747.114308 C153.489703,747.502848 153.489703,747.981549 153.272188,748.370088 C153.054674,748.758628 152.652691,748.997978 152.217662,748.997978 C151.545166,748.997978 151,748.435746 151,747.742198 C151,747.04865 151.545166,746.486418 152.217662,746.486418 Z M156.741152,740.743209 C157.185923,740.728194 157.603284,740.964334 157.829979,741.359262 C158.056674,741.754189 158.056674,742.245135 157.829979,742.640063 C157.603284,743.03499 157.185923,743.27113 156.741152,743.256115 C156.083812,743.233924 155.562066,742.677943 155.562066,741.999662 C155.562066,741.321381 156.083812,740.7654 156.741152,740.743209 L156.741152,740.743209 Z M152.217662,740.743209 C152.890158,740.743209 153.435324,741.305441 153.435324,741.998989 C153.435324,742.692537 152.890158,743.254769 152.217662,743.254769 C151.545166,743.254769 151,742.692537 151,741.998989 C151,741.305441 151.545166,740.743209 152.217662,740.743209 L152.217662,740.743209 Z M157.796244,735.628227 C158.013875,736.016975 158.013875,736.495932 157.796244,736.88468 C157.578613,737.273428 157.176414,737.512906 156.741152,737.512906 C156.068296,737.512906 155.522838,736.950373 155.522838,736.256453 C155.522838,735.562533 156.068296,735 156.741152,735 C157.176414,735 157.578613,735.239479 157.796244,735.628227 Z M152.217662,735 C152.890158,735 153.435324,735.562232 153.435324,736.25578 C153.435324,736.949328 152.890158,737.51156 152.217662,737.51156 C151.545166,737.51156 151,736.949328 151,736.25578 C151,735.562232 151.545166,735 152.217662,735 L152.217662,735 Z"
                            id="拖动"
                            transform="translate(154.500000, 742.000000) scale(-1, 1) translate(-154.500000, -742.000000) "
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>{" "}
                  {renderChildren(item, index)}
                </div>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
