//generate nodes

function randomizeArray(prefix, numberOfItems) {
    const items = []
    for (let i = 0; i < numberOfItems; i++) {
        items.push(`${prefix}-${i}`)
    }
    return items
}

// nodes as trends
const numberOfMegaTrends = 10
const trendPrefix = 'TREND';
const trends = randomizeArray(trendPrefix, numberOfMegaTrends)

const numberOfTech = 30
const prefixOfTech = 'tech'
const techs = randomizeArray(prefixOfTech, numberOfTech);

const numberOfCases = 50
const prefixOfCase = 'CasE'
const cases = randomizeArray(prefixOfCase, numberOfCases)

const rootId = 'Radar';

const nodes = []
// add root
nodes.push(
    {
        id: rootId,
        group: 0,
        collapsed: 1,
        childLinks: []
    }
)

function addNode(id, group = 1) {
    const obj = {id, group}
    obj.collapsed = 1
    obj.childLinks = []
    nodes.push(obj)
}
trends.forEach(e => addNode(e, 1))
techs.forEach(e => addNode(e, 2))
cases.forEach(e => addNode(e, 3))


numberOfLinks = 50

function link(source, target, value = 1) {
    return {
        source, target, value
    }
}

function randomLinkedNodes(numberOfLinks) {
    const links = []
    const maxNodeIndex = nodes.length - 1
    for (let i = 0; i < numberOfLinks; i++) {
        const sourceIndex = Math.round(Math.random() * maxNodeIndex)
        let targetIndex;
        do {
            targetIndex = Math.round(Math.random() * maxNodeIndex)
        } while (targetIndex === sourceIndex)
        const sourceId = nodes[sourceIndex].id
        const targetId = nodes[targetIndex].id
        links.push(link(sourceId, targetId))
    }
    return links
}

// connect trend with techs

function xxx () {
    const maxNumberOfTechForOneCase = 3;
    const links = []

    // link root with trends
    for (let i = 0; i < trends.length; i++) {
        const linkWithRoot = link(rootId, trends[i])
        debugger
        links.push(linkWithRoot)
    }



    //link trends with tech
    for (let i = 0; i < techs.length; i++) {
        const randomTrend = Math.round(Math.random() * (trends.length - 1))
        const source = trends[randomTrend]
        const target = techs[i]
        if (source === undefined) {
            debugger
        }
        links.push(link(source, target))
    }
    //link case with tech
    for (let i = 0; i < cases.length; i++) {
        const target = cases[i]
        const numberOfLinks = Math.round(Math.random() * maxNumberOfTechForOneCase + 1) || 1
        for (let j = 0; j < numberOfLinks; j++) {
            const randomTech = Math.round(Math.random() * (techs.length -1))
            const source = techs[randomTech]
            links.push(link(source, target))
        }
    }


    return links
}


const links = xxx();


const gData = {
    nodes, links
}

// link parent/children
const nodesById = Object.fromEntries(gData.nodes.map(node => [node.id, node]));
gData.links.forEach(link => {
    nodesById[link.source].childLinks.push(link);
});

const getPrunedTree = () => {
    const visibleNodes = [];
    const visibleLinks = [];

    (function traverseTree(node = nodesById[rootId]) {
        visibleNodes.push(node);
        if (node.collapsed) return;
        visibleLinks.push(...node.childLinks);
        node.childLinks
            .map(link => ((typeof link.target) === 'object') ? link.target : nodesById[link.target]) // get child node
            .forEach(traverseTree);
    })(); // IIFE

    return { nodes: visibleNodes, links: visibleLinks };
};


console.log('gData', gData);

//nodes as tech

//nodes as case


// random linking?


//generate links
