const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
const namespace = joint.shapes;

const graph = new joint.dia.Graph({}, { cellNamespace: namespace });

const paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1300,
    height: 800,
    gridSize: 1,
    background: {
        color: 'teal'
    },
    cellViewNamespace: namespace
});

const rect = new joint.shapes.standard.Rectangle();
rect.position(240, 270);
rect.resize(120, 100);
rect.attr({
    body: {
        fill: 'white',
        event: 'element:background-change'
    },
    label: {
        text: 'Rectangle',
        fontSize: 20,
        fill: 'black'
    }
});
rect.addTo(graph);

const circle = new joint.shapes.standard.Circle();
circle.position(450, 270);
circle.resize(100, 100);
circle.attr({
    body: {
        fill: 'white',
        event: 'element:resize'
    },
    label: {
        text: 'Circle',
        fontSize: 20,
        fill: 'black'
    }
});
circle.addTo(graph);

const ellipse = new joint.shapes.standard.Ellipse();
ellipse.position(630, 270);
ellipse.resize(200, 100);
ellipse.attr({
    body: {
        fill: 'white',
        event: 'element:label-change'
    },
    label: {
        text: 'Ellipse',
        fontSize: 20,
        fill: 'black'
    }
});
ellipse.addTo(graph);

const polygon = new joint.shapes.standard.Polygon();
polygon.position(930, 270);
polygon.resize(100, 100);
polygon.attr({
    body: {
        fill: 'white',
        event: 'element:stroke-change'
    },
    label: {
        text: 'Polygon',
        fontSize: 20,
        fill: 'black'
    }
});
polygon.addTo(graph);

paper.on('element:background-change', (elementView) => {
   elementView.model.attr('body/fill', randomColor);
});
 
paper.on('element:label-change', (elementView) => {
   elementView.model.attr('label/fill', randomColor);
});
 
paper.on('element:resize', (elementView) => {
   elementView.model.resize(150, 150);
});
 
paper.on('element:stroke-change', (elementView) => {
   elementView.model.attr('body/stroke', randomColor);
   elementView.model.attr('body/strokeWidth', 8);
});

