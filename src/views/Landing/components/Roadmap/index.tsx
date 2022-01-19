import React from "react";
import "./roadmap.scss";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import BlobIcon from "../../assets/tokens/BLOB.png";

function Roadmap() {
    return (
        <div className="roadmap-main">
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "#505048", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  #181716bf " }}
                    iconStyle={{ background: "#505048", color: "#fff" }}
                    // icon={<WorkIcon />}
                >
                    <h1 className="vertical-timeline-element-title">Pre Sale</h1>
                    <h4 className="vertical-timeline-element-subtitle">Put date here</h4>
                    <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "#505048", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  #181716bf " }}
                    iconStyle={{ background: "#505048", color: "#fff" }}
                    // icon={<WorkIcon />}
                >
                    <h1 className="vertical-timeline-element-title">Public Launch</h1>
                    <h4 className="vertical-timeline-element-subtitle">Put date here</h4>
                    <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "#505048", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  #181716bf " }}
                    iconStyle={{ background: "#505048", color: "#fff" }}
                    // icon={<WorkIcon />}
                >
                    <h1 className="vertical-timeline-element-title">Pre Sale</h1>
                    <h4 className="vertical-timeline-element-subtitle">Put date here</h4>
                    <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "#505048", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  #181716bf " }}
                    iconStyle={{ background: "#505048", color: "#fff" }}
                    // icon={<WorkIcon />}
                >
                    <h1 className="vertical-timeline-element-title">Pre Sale</h1>
                    <h4 className="vertical-timeline-element-subtitle">Put date here</h4>
                    <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "#505048", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  #181716bf " }}
                    iconStyle={{ background: "#505048", color: "#fff" }}
                    // icon={<WorkIcon />}
                >
                    <h1 className="vertical-timeline-element-title">Pre Sale</h1>
                    <h4 className="vertical-timeline-element-subtitle">Put date here</h4>
                    <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "#505048", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  #181716bf " }}
                    iconStyle={{ background: "#505048", color: "#fff" }}
                    // icon={<WorkIcon />}
                >
                    <h1 className="vertical-timeline-element-title">Pre Sale</h1>
                    <h4 className="vertical-timeline-element-subtitle">Put date here</h4>
                    <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "#505048", color: "#fff" }}
                    contentArrowStyle={{ borderRight: "7px solid  #181716bf " }}
                    iconStyle={{ background: "#505048", color: "#fff" }}
                    // icon={<WorkIcon />}
                >
                    <h1 className="vertical-timeline-element-title">Pre Sale</h1>
                    <h4 className="vertical-timeline-element-subtitle">Put date here</h4>
                    <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </div>
    );
}
export default Roadmap;
// import { Link } from "@material-ui/core";
// import { Chrono } from "react-chrono";

// function Roadmap() {
//     const items = [
//         {
//             title: "May 1940",
//             cardTitle: "Dunkirk",

//             cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
//             cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
//         },
//         {
//             title: "May 1940",
//             cardTitle: "Dunkirk",

//             cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
//             cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
//         },
//         {
//             title: "May 1940",
//             cardTitle: "Dunkirk",

//             cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
//             cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
//         },
//         {
//             title: "May 1940",
//             cardTitle: "Dunkirk",

//             cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
//             cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
//         },
//     ];

//     return (
//         <div className="roadmap-main">
//             <Chrono
//                 items={items}
//                 mode="VERTICAL_ALTERNATING"
//                 scrollable
//                 theme={{
//                     primary: "#505048",
//                     secondary: "grey",
//                     cardBgColor: "#505048",
//                     cardForeColor: "white",
//                     titleColor: "white",
//                 }}
//                 borderLessCards={true}
//                 hideControls={true}
//                 useReadMore={false}
//                 activeItemIndex={0}
//                 cardWidth={500}
//             />
//         </div>
//     );
// }

// export default Roadmap;
