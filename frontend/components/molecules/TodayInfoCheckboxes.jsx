import Checkbox from "../atoms/Checkbox";

const TodayInfoCheckboxes = ({ checkboxState, clickCheckbox }) => {
    return (
        <>
            {
                checkboxState.map((prop, index) => {
                    return (
                        <div key={prop, index} onClick={() => clickCheckbox(index)}>
                            <Checkbox state={checkboxState[index]} />
                        </div>
                    );
                })
            }
            <style jsx>{`
            div{
                display: flex;
                width: 25px;
                height: 25px;
                overflow: hidden;
                cursor: pointer;
            }
            `}</style>
        </>
    )
}

export default TodayInfoCheckboxes