export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLocaleLowerCase());
}


export const categories = [
    { name: 'Ciencia', icon: 'vial' },
    { name: 'Música', icon: 'music' },
    { name: 'Entretenimiento', icon: 'theater-masks' },
    { name: 'Deportes', icon: 'football-ball' },
    { name: 'Actualidad', icon: 'globe' },
    { name: 'Tecnología', icon: 'memory' },
    { name: 'Otros', icon: 'puzzle-piece' }
]