import React from 'react';

const AdminAllTextsPage = ({data}) => {
    return (
        <>
        <h1>Тексты всех языков</h1>
        <ul>
            {data.languages.map(language=>{
                return(
                <li key={language.code}><a href={`/admin/texts/${language.code}`}>{language.name}({language.code})</a></li>
                )
            })}
        </ul>
        </>
    )
}

export default AdminAllTextsPage;