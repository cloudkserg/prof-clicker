import WorkerView from "../Worker/WorkerView";
import React from "react";

export default function Road(props) {
    return (
        <div className="road">
            {props.workers.map(worker => <WorkerView key={worker.id} worker={worker} ></WorkerView>)}
        </div>
    );
}
