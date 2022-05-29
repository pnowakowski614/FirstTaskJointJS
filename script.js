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

paper.translate(150, 20);

const rect = new joint.shapes.standard.Rectangle();
rect.position(90, 250);
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
circle.position(300, 250);
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
ellipse.position(480, 250);
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
polygon.position(780, 250);
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


