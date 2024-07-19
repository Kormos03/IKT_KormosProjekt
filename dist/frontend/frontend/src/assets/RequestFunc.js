"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestFunc = void 0;
async function RequestFunc(method, route, body, token) {
    if (token) {
        const response = await fetch(route, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        response;
    }
    const response = await fetch(route, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    if (response.status === 200) {
        const { data } = await response.json();
        return data;
    }
    else if (response.status === 401) {
        throw new Error('Unauthorized');
    }
    else {
        throw new Error('An error occurred, try again later');
    }
}
exports.RequestFunc = RequestFunc;
//# sourceMappingURL=RequestFunc.js.map