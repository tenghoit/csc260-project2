function Table(props){

    function TableRow(props){
        return(
            <tr key={props.index}>
                <td>{props.grant.Institution}</td>
                <td>{props.grant.ProjectTitle}</td>
                <td>{props.grant.ApprovedMatching}</td>
                <td>{props.grant.BeginGrant}</td>
                <td>{props.grant.EndGrant}</td>
            </tr>
        )
    }


    return (
        <table>
            <thead>
                <tr>
                    <th>Institution</th>
                    <th>Project Title</th>
                    <th>Approved Matching</th>
                    <th>Begin Grant</th>
                    <th>End Grant</th>
                </tr>
            </thead>
            <tbody>
                {props.grants.map((grant, index) => (
                    <TableRow key={index} grant={grant} />
                ))}
            </tbody>
        </table>
    )
}


export default Table;