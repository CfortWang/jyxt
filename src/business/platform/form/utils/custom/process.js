let xml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0nv3wie"
    targetNamespace="http://bpmn.io/schema/bpmn"
    xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
    <process id="Process_test" name="测试测试" isExecutable="false">
        <startEvent id="StartEvent_kaishi" name="开始">
            <outgoing>Flow_start</outgoing>
        </startEvent>
        <userTask id="Activity_item1" name="环境监控">
            <incoming>Flow_start</incoming>
            <outgoing>Flow_item1</outgoing>
        </userTask>
        <sequenceFlow id="Flow_start" sourceRef="StartEvent_kaishi" targetRef="Activity_item1" />
        <userTask id="Activity_item2" name="数据输入">
            <incoming>Flow_item1</incoming>
            <outgoing>Flow_item2</outgoing>
        </userTask>
        <sequenceFlow id="Flow_item1" sourceRef="Activity_item1" targetRef="Activity_item2" />
        <userTask id="Activity_item3" name="数据校验">
            <incoming>Flow_item2</incoming>
            <outgoing>Flow_item3</outgoing>
        </userTask>
        <sequenceFlow id="Flow_item2" sourceRef="Activity_item2" targetRef="Activity_item3" />
        <endEvent id="Event_over" name="结束">
            <incoming>Flow_item3</incoming>
        </endEvent>
        <sequenceFlow id="Flow_item3" sourceRef="Activity_item3" targetRef="Event_over" />
        <textAnnotation id="TextAnnotation_start"><text>测试表单</text></textAnnotation>
        <association id="Association_start" sourceRef="StartEvent_kaishi" targetRef="TextAnnotation_start" />
        <textAnnotation id="TextAnnotation_item1"><text>节点1</text></textAnnotation>
        <association id="Association_item1" sourceRef="Activity_item1" targetRef="TextAnnotation_item1" />
        <textAnnotation id="TextAnnotation_item2"><text>节点2</text></textAnnotation>
        <association id="Association_item2" sourceRef="Activity_item2" targetRef="TextAnnotation_item2" />
        <textAnnotation id="TextAnnotation_item3"><text>节点3</text></textAnnotation>
        <association id="Association_item3" sourceRef="Activity_item3" targetRef="TextAnnotation_item3" />
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_11stfhp">
        <bpmndi:BPMNPlane id="BPMNPlane_08oievs" bpmnElement="Process_test">
            <bpmndi:BPMNShape id="TextAnnotation_1kjtalr_di" bpmnElement="TextAnnotation_start">
                <dc:Bounds x="148" y="90" width="100" height="30" />
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="TextAnnotation_09z8leg_di" bpmnElement="TextAnnotation_item1">
                <dc:Bounds x="270" y="90" width="100" height="30" />
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="TextAnnotation_1be7276_di" bpmnElement="TextAnnotation_item2">
                <dc:Bounds x="430" y="90" width="100" height="30" />
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="TextAnnotation_02urs2d_di" bpmnElement="TextAnnotation_item3">
                <dc:Bounds x="590" y="90" width="100" height="30" />
            </bpmndi:BPMNShape>
            <bpmndi:BPMNEdge id="Flow_0t0p05n_di" bpmnElement="Flow_start">
                <di:waypoint x="216" y="258" />
                <di:waypoint x="270" y="258" />
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="Flow_0femavv_di" bpmnElement="Flow_item1">
                <di:waypoint x="370" y="258" />
                <di:waypoint x="430" y="258" />
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="Flow_080dpcs_di" bpmnElement="Flow_item2">
                <di:waypoint x="530" y="258" />
                <di:waypoint x="590" y="258" />
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="Flow_12fh270_di" bpmnElement="Flow_item3">
                <di:waypoint x="690" y="258" />
                <di:waypoint x="752" y="258" />
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNShape id="_BPMNShape_StartEvent_1uyzqxg" bpmnElement="StartEvent_kaishi">
                <dc:Bounds x="180" y="240" width="36" height="36" />
                <bpmndi:BPMNLabel>
                    <dc:Bounds x="186" y="283" width="23" height="14" />
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="Activity_0xfb9td_di" bpmnElement="Activity_item1">
                <dc:Bounds x="270" y="218" width="100" height="80" />
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="Activity_0wktwyr_di" bpmnElement="Activity_item2">
                <dc:Bounds x="430" y="218" width="100" height="80" />
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="Activity_0y4vf5h_di" bpmnElement="Activity_item3">
                <dc:Bounds x="590" y="218" width="100" height="80" />
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="Event_09sx30m_di" bpmnElement="Event_over">
                <dc:Bounds x="752" y="240" width="36" height="36" />
                <bpmndi:BPMNLabel>
                    <dc:Bounds x="759" y="283" width="23" height="14" />
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNEdge id="Association_1lzdglf_di" bpmnElement="Association_start">
                <di:waypoint x="198" y="240" />
                <di:waypoint x="198" y="120" />
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="Association_00qfrme_di" bpmnElement="Association_item1">
                <di:waypoint x="320" y="218" />
                <di:waypoint x="320" y="120" />
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="Association_0qst5zy_di" bpmnElement="Association_item2">
                <di:waypoint x="480" y="218" />
                <di:waypoint x="480" y="120" />
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="Association_006rzyc_di" bpmnElement="Association_item3">
                <di:waypoint x="640" y="218" />
                <di:waypoint x="640" y="120" />
            </bpmndi:BPMNEdge>
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</definitions>`

const typeList = {
    box: 'Definitions',
    process: 'Process',
    start: 'StartEvent',
    activity: 'Activity',
    flow: 'Flow',
    over: 'Event',
    desc: 'Association',
    text: 'TextAnnotation'
}

const getRandomKey = (type, length = 5) => {
    let key = `${typeList[type]}_custom_${Math.random().toString().substring(2, length)+Date.now().toString(32)}`
    return key
}

const getXml = (data) => {
    let part1 = `<?xml version="1.0" encoding="UTF-8"?><definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="${getRandomKey(box)}"
    targetNamespace="http://bpmn.io/schema/bpmn"
    xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">`
    let part2 = ``
}

export const processData = {
    "deploy": true,
    "newDeploy": false,
    "typeId": "",
    "defId": "",
    "defXml": xml
}