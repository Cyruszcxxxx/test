import Source from '../models/source.js'

const sourceService = {
    createSource: async (data) => {
        const newSource = new Source(data);
        return await newSource.save();
    },

    getSourcesByUser: async (userId) => {
        return await Source.find({ user: userId });
    },

    updateSource: async (sourceId, updatedData) => {
        return await Source.findByIdAndUpdate(sourceId, updatedData).exec();
    },

    deleteSource: async (sourceId) => {
        return await Source.findByIdAndDelete(sourceId);
    }
};

export default sourceService;