// const randomColor = () => {
//     return '#' + Math.floor(Math.random()*16777215).toString(16);
// }

// const randomBorderSize = () => {
//     return Math.floor(Math.random()*40);
// }

// const randomCircleSize = () => {
//     return Math.floor(Math.random()*200) + 100;
// }

const namespace = joint.shapes;

const defaultAttr = {
    backgroundFill: 'white',
    fontSize: 20,
    labelFill: 'black',
};

const graph = new joint.dia.Graph({}, { cellNamespace: namespace });

const paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1700,
    height: 900,
    gridSize: 1,
    background: {
        color: 'gray'
    },
    cellViewNamespace: namespace
});

//functions to create shapes, links, info button

joint.elementTools.InfoButton = joint.elementTools.Button.extend({
    name: 'info-button',
    options: {
        markup: [{
            tagName: 'circle',
            selector: 'button',
            attributes: {
                'r': 7,
                'fill': '#001DFF',
                'cursor': 'pointer'
            }
        }, {
            tagName: 'path',
            selector: 'icon',
            attributes: {
                'd': 'M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4',
                'fill': 'none',
                'stroke': '#FFFFFF',
                'stroke-width': 2,
                'pointer-events': 'none'
            }
        }],
        distance: 300,
        x: '100%',
        y: '100%',
        action: function() {
            alert(`View id: ${this.id} \n Model id:  ${this.model.id}`);
        }
    }
});

const createRect = (positionX, positionY) => {
    const rect = new joint.shapes.standard.Rectangle();
    rect.position(positionX, positionY);
    rect.resize(120, 100);
    rect.attr({
        body: {
            fill: defaultAttr.backgroundFill,
            event: 'element:background-change',
        },
        label: {
            text: 'Rectangle',
            fontSize: defaultAttr.fontSize,
            fill: defaultAttr.labelFill
        }
    });
    rect.addTo(graph);
    return rect;
}

const createCir = (positionX, positionY) => {
    const circle = new joint.shapes.standard.Circle();
    circle.position(positionX, positionY);
    circle.resize(100, 100);
    circle.attr({
        body: {
            fill: defaultAttr.backgroundFill,
            event: 'element:resize'
        },
        label: {
            text: 'Circle',
            fontSize: defaultAttr.fontSize,
            fill: defaultAttr.labelFill
        }
    });
    circle.addTo(graph);
    return circle;
}

const createEllipse = (positionX, positionY) => {
    const ellipse = new joint.shapes.standard.Ellipse();
    ellipse.position(positionX, positionY);
    ellipse.resize(200, 100);
    ellipse.attr({
        body: {
            fill: defaultAttr.backgroundFill,
            event: 'element:label-change'
        },
        label: {
            text: 'Ellipse',
            fontSize: defaultAttr.fontSize,
            fill: defaultAttr.labelFill
        }
    });
    ellipse.addTo(graph);
    return ellipse;
}

const createPolygon = (positionX, positionY) => {
    const polygon = new joint.shapes.standard.Polygon();
    polygon.position(positionX, positionY);
    polygon.resize(100, 100);
    polygon.attr({
        body: {
            fill: defaultAttr.backgroundFill,
            event: 'element:stroke-change'
        },
        label: {
            text: 'Polygon',
            fontSize: defaultAttr.fontSize,
            fill: defaultAttr.labelFill
        }
    });
    polygon.addTo(graph);
    return polygon;
}

const createConnection = (source, target) => {
    const link = new joint.shapes.standard.Link();
    link.source(source);
    link.target(target);
    link.attr('line/event', 'link:pointerclick')
    link.addTo(graph);
    link.prop('data/listNumber', 1);
    return link;
}

//creating shapes, links, tools

const rect = createRect(100, 200);
const cir = createCir(250, 400);
const ellipse = createEllipse(300, 600);
const polygon = createPolygon(900, 150);
const rect2 = createRect(900, 300);
const cir2 = createCir(1050, 700);

const link1 = createConnection(rect, rect2);
const link2 = createConnection(ellipse, polygon);
const link3 = createConnection(cir, cir2);

const boundaryTool = new joint.elementTools.Boundary();
const removeButton = new joint.elementTools.Remove({
    x: '50%'
});
const infoButton = new joint.elementTools.InfoButton();

const verticesTool = new joint.linkTools.Vertices();
const segmentsTool = new joint.linkTools.Segments();
const sourceAnchorTool = new joint.linkTools.SourceAnchor();
const targetAnchorTool = new joint.linkTools.TargetAnchor();
const boundaryLinkTool = new joint.linkTools.Boundary();
const removeLinkButton = new joint.linkTools.Remove();

//adding attributes to links

link1.appendLabel({
    attrs: {
        text: {
            text: 'Hello, World'
        }
    }
});
link1.attr('line/targetMarker/type', 'none');

link2.attr({
    line: {
        sourceMarker: {
            d: 'M 10 -5 0 0 10 5 Z',
            fill: 'lightgreen'
        },
        targetMarker: {
            fill: 'lightgreen'
        }
    }
});

link3.attr('line/stroke', 'red');

//creating on-hover toolViews

const linksToolsView = new joint.dia.ToolsView({
    tools: [
        verticesTool, segmentsTool,
        sourceAnchorTool, targetAnchorTool,
        boundaryLinkTool, removeLinkButton,
        infoButton
    ]
});

const toolsView = new joint.dia.ToolsView({
    tools: [
        boundaryTool,
        removeButton,
        infoButton
    ]
});

//function that adds info button to links/shapes

const addInfoButton = (element) => {
    const infoButton = new joint.elementTools.InfoButton();

    const newToolView = new joint.dia.ToolsView({
        tools: [
            infoButton
        ]
    });

    element.findView(paper).addTools(newToolView);
}

//functions that update links/shapes (at the start and after mouseleave)

const updateLinks = () => {
    const links = graph.getLinks();

    for (const link of links) {
        addInfoButton(link);
    }
}

const updateShapes = () => {
    const shapes = graph.getElements();

    for (const shape of shapes) {
        addInfoButton(shape);
    }
}

updateLinks();
updateShapes();

//on-hover events

paper.on('link:mouseenter', function(linkView) {
    linkView.addTools(linksToolsView);
});

paper.on('link:mouseleave', function(linkView) {
    linkView.removeTools(linksToolsView);
    updateLinks();
});

paper.on('element:mouseenter', function(elementView) {
    elementView.addTools(toolsView);
});

paper.on('element:mouseleave', function(elementView) {
    elementView.removeTools(toolsView);
    updateShapes();
});

//on-click events

paper.on('link:pointerclick', (linkView) => {
    if(linkView.model.attributes.data.listNumber === 12)
        linkView.model.attributes.data.listNumber = 1;
    else
        ++linkView.model.attributes.data.listNumber;

    console.log(linkView.model.attributes.data.listNumber)

    switch(linkView.model.attributes.data.listNumber) {
        case 1:
            linkView.model.connector('normal');
            linkView.model.router('normal');
            break;
        case 2:
            linkView.model.connector('normal');
            linkView.model.router('manhattan');
            break;
        case 3:
            linkView.model.connector('normal');
            linkView.model.router('metro');
            break;
        case 4:
            linkView.model.connector('rounded');
            linkView.model.router('normal');
            break;
        case 5:
            linkView.model.connector('rounded');
            linkView.model.router('manhattan');
            break;
        case 6:
            linkView.model.connector('rounded');
            linkView.model.router('metro');
            break;
        case 7:
            linkView.model.connector('rounded');
            linkView.model.router('orthogonal');
            break;
        case 8:
            linkView.model.connector('smooth');
            linkView.model.router('metro');
            break;
        case 9:
            linkView.model.connector('smooth');
            linkView.model.router('manhattan');
            break;
        case 10:
            linkView.model.connector('smooth');
            linkView.model.router('normal');
            break;
        case 11:
            linkView.model.connector('jumpover');
            linkView.model.router('normal');
            break;
        case 12:
            linkView.model.connector('jumpover');
            linkView.model.router('manhattan');
            break;
        default:
            throw(error);
    }
}) 

//link update after element position change

graph.on('change:position', () => {
    const links = graph.getLinks();

    for (const link of links) {
        link.findView(paper).requestConnectionUpdate();
    }
});


// paper.on('element:background-change', (elementView) => {
//    elementView.model.attr('body/fill', randomColor());
// });
 
// paper.on('element:label-change', (elementView) => {
//    elementView.model.attr('label/fill', randomColor());
// });
 
// paper.on('element:resize', (elementView) => {
//    const size = randomCircleSize();
//    elementView.model.resize(size, size);
// });
 
// paper.on('element:stroke-change', (elementView) => {
//    elementView.model.attr('body/stroke', randomColor());
//    elementView.model.attr('body/strokeWidth', randomBorderSize());
// });

