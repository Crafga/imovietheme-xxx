import axios from 'axios';
import { env } from '$env/dynamic/private';

const urlAPI = env.PRIVATE_MOVIES_API_URL;
const ApiKey = env.PRIVATE_MOVIES_API_KEY;

export const MovieList = async (page: string = "1") => {
    try {
        const req = await axios.get(`${urlAPI}/api/v1/list1?page=${page}`, {
            headers: {
                'authorization': `${ApiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (req.data.status === 200) {
            return { data: req.data }
        } else {
            return {
                data: null
            }
        }
    } catch (error) {
        return {
            status: 400,
            data: null,
            message: error
        }
    }
}

export const getMovieByID = async (id: string) => {
    try {
        const req = await axios.get(`${urlAPI}/api/v1/getMovieById?id=${id}`, {
            headers: {
                'authorization': `${ApiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (req.data.status === 200) {
            return { data: req.data }
        } else {
            return {
                data: null
            }
        }
    } catch (error) {
        return {
            status: 400,
            data: null,
            message: error
        }
    }
}

export const FiltersMovie = async (page: string = "1", categorie: string = '', tag: string = '', postName: string = '') => {
    let config = {
        "categorie": categorie,
        "tag": tag,
        "postName": postName
    };
    try {
        const req = await axios.post(`${urlAPI}/api/v1/filters?page=${page}`, config, {
            headers: {
                'authorization': `${ApiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (req.data.status === 200) {
            return { data: req.data }
        } else {
            return {
                status: req.data.status || 400,
                data: null
            }
        }
    } catch (error) {
        return {
            status: 400,
            data: null,
            message: error
        }
    }
}

export const Categories = async () => {
    try {
        const req = await axios.get(`${urlAPI}/api/v1/categories`, {
            headers: {
                'authorization': `${ApiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (req.data.status === 200) {
            return { data: req.data }
        } else {
            return {
                data: null
            }
        }
    } catch (error) {
        return {
            status: 400,
            data: null,
            message: error
        }
    }
}

export const Tags = async () => {
    try {
        const req = await axios.get(`${urlAPI}/api/v1/tags`, {
            headers: {
                'authorization': `${ApiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (req.data.status === 200) {
            return { data: req.data }
        } else {
            return {
                data: null
            }
        }
    } catch (error) {
        return {
            status: 400,
            data: null,
            message: error
        }
    }
}