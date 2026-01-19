import "./Table.css"

function Table(props){

    function TableHeader(props){
        return(
            <tr>
                {props.attributes.map((attr) => (
                    <th>{attr}</th>
                ))}
            </tr>
        )
    }

    function TableRow(props){
        return(
            <tr key={props.index}>
                {props.attributes.map((attr) => (
                    <td>{props.grant[attr]}</td>
                ))}
            </tr>
        )
    }


    return (
        <table>
            <thead>
                <TableHeader attributes={props.attributes} />
                {/* <tr>
                    <th>Institution</th>
                    <th>Project Title</th>
                    <th>Approved Matching</th>
                    <th>Begin Grant</th>
                    <th>End Grant</th>
                </tr> */}
            </thead>
            <tbody>
                {props.grants.map((grant, index) => (
                    <TableRow key={index} grant={grant} attributes={props.attributes} />
                ))}
            </tbody>
        </table>
    )
}


export default Table;