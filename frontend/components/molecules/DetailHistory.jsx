
const DetailHistory = ({isOpenModal = false}) => {

    return (
    <>
    <div>
        하이
    </div>

    <style jsx>{`
        div{
            display: ${(isOpenModal ? 'flex':'none')};
        }
    `}</style>
    </>);
}

export default DetailHistory;