import React from "react";

function CommentList( {comments} ) {

    const renderedComments = comments.map(comment => {
        const status = comment.status;
        let content = comment.content;
        if( status === "pending") {
            content = "Pendiente de aprobación"; 
        }
        if(status === "rejected") {
            content = "Infringe nuestra políticas";
        }
        return <li key={comment.id}>{content}</li>
    })

    return(
        <ul>
            {renderedComments}
        </ul>
    )
}

export default CommentList;