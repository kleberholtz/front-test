import { Badge, Tooltip } from 'components/ui'

const dateBadge = (date, isBadge) => {
    if (!date) {
        return null
    }
    isBadge = isBadge || false

    const formattedDate = new Date(date)
    const currentDate = new Date()

    const diffTime = Math.abs(currentDate - formattedDate)
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30))
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7))
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffTime / (1000 * 60))
    const diffSeconds = Math.floor(diffTime / 1000)

    let badgeText = ''
    if (diffYears > 1) {
        badgeText = `${diffYears} anos atrás`
    } else if (diffYears === 1) {
        badgeText = '1 ano atrás'
    } else if (diffMonths > 1) {
        badgeText = `${diffMonths} meses atrás`
    } else if (diffMonths === 1) {
        badgeText = '1 mês atrás'
    } else if (diffWeeks > 1) {
        badgeText = `${diffWeeks} semanas atrás`
    } else if (diffWeeks === 1) {
        badgeText = '1 semana atrás'
    } else if (diffDays > 1) {
        badgeText = `${diffDays} dias atrás`
    } else if (diffDays === 1) {
        badgeText = '1 dia atrás'
    } else if (diffHours > 1) {
        badgeText = `${diffHours} horas atrás`
    } else if (diffHours === 1) {
        badgeText = '1 hora atrás'
    } else if (diffMinutes > 1) {
        badgeText = `${diffMinutes} minutos atrás`
    } else if (diffMinutes === 1) {
        badgeText = '1 minuto atrás'
    } else if (diffSeconds > 1) {
        badgeText = `${diffSeconds} segundos atrás`
    } else {
        badgeText = 'Agora mesmo'
    }

    // let tooltipText = formattedDate.toLocaleString('pt-BR', { timeZone: 'UTC' })
    // if (diffYears > 1) {
    //     tooltipText = formattedDate.toLocaleString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
    // } else if (diffMonths > 1) {
    //     tooltipText = formattedDate.toLocaleString('pt-BR', { month: 'long', day: 'numeric' })
    // } else if (diffDays > 1) {
    //     tooltipText = formattedDate.toLocaleString('pt-BR', { month: 'long', day: 'numeric' })
    // } else if (diffHours > 1) {
    //     tooltipText = formattedDate.toLocaleString('pt-BR', { hour: 'numeric', minute: 'numeric' })
    // } else if (diffMinutes > 1) {
    //     tooltipText = formattedDate.toLocaleString('pt-BR', { hour: 'numeric', minute: 'numeric' })
    // } else if (diffSeconds > 1) {
    //     tooltipText = formattedDate.toLocaleString('pt-BR', { hour: 'numeric', minute: 'numeric' })
    // } else {
    //     tooltipText = 'Agora mesmo'
    // }

    return isBadge ? <Badge content={badgeText} innerClass={'bg-neutral-700'}></Badge> : badgeText
}


export default dateBadge