const { getDb } = require('./db.js');

const getAllAnnouncements = async ()=>{
    const db = getDb();
    const announcements = await db.collection('announcements').find().toArray();
    return announcements;
}

const addAnnouncement = async (announcement)=>{

}

const deleteAnnouncement = async (id)=>{

}

module.exports = {
    getAllAnnouncements: getAllAnnouncements,
    addAnnouncement: addAnnouncement,
    deleteAnnouncement: deleteAnnouncement
}