

export function dev(dev = false) {
    if (dev === true) {
        return "http://127.0.0.1:3200"
    } else {
        return "https://back-pod.herokuapp.com"
    }
}