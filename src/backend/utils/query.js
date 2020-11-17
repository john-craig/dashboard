export function buildQuery(term, operator, value){
    const query = new URLSearchParams('q=p')

    query.set('q', term + " " + operator + " '" + value + "'")

    return query.toString()
}