const convertDate = (date, showSeconds) => {
    showSeconds = showSeconds || false
    return new Date(date).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined
    })
}

export default convertDate