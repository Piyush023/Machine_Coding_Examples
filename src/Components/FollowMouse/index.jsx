export const MouseFollow = () => {
    const moveDiv = (e) => {
        const circle = document.getElementById("circle")
        circle.style.top = `${e.pageY}px`
        circle.style.left = `${e.pageX}px`
    }

    return (
        <div
            className="parent"
            onMouseMove={(e) => { moveDiv(e) }}
        >
            <div id="circle" />
        </div>
    );
}
