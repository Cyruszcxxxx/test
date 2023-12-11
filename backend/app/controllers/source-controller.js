import sourceService from '../services/source-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

export const addSource = async (request, response) => {
    try {
        const newSource = { ...request.body };
        const source = await sourceService.createSource(newSource);
        setResponse(source, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

export const getSourcesByUser = async (request, response) => {
    try {
        const userId = request.params.userId;
        const sources = await sourceService.getSourcesByUser(userId);
        setResponse(sources, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

export const updateSource = async (request, response) => {
    try {
        const sourceId = request.params.sourceId;
        const updatedSourceData = { ...request.body };
        const updatedSource = await sourceService.updateSource(sourceId, updatedSourceData);
        setResponse(updatedSource, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

export const deleteSource = async (request, response) => {
    try {
        const sourceId = request.params.sourceId;
        await sourceService.deleteSource(sourceId);
        setResponse({ message: 'Source successfully deleted' }, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};
