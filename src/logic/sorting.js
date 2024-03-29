export const sortByDate = (List) =>{
    if (!List || List.length === 0) {
        return [];
    }
    
    const sortedlist = List.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
    
        return dateB - dateA;
    });

    return sortedlist;
}

export const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
}

export const sortByViews = (List) => {
    if (!List || List.length === 0) {
        return [];
    }
    
    const sortedlist = List.sort((a, b) => {
            const dateA = a.views;
            const dateB = b.views;
    
        return dateB - dateA;
    });

    return sortedlist;
}