const pool = require('../config/db');
const jobModel = require('../models/jobModel');

exports.home = (req, res) => {
  res.render('home');
};

exports.showJobs = async (req, res) => {
  try {
    const jobs = await jobModel.getAllJobs();
    res.render('jobs', { jobs: jobs.rows });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).send('Server error');
  }
};

exports.newJobPage = (req, res) => {
  res.render('new_job');
};

exports.createJob = async (req, res) => {
  const { title, description, price, contact } = req.body;
  try {
    await jobModel.createJob(title, description, price, contact, req.session.userId);
    res.redirect('/jobs');
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).send('Server error');
  }
};

exports.updateJob = async (req, res) => {
  const { title, description, price, contact } = req.body;
  const jobId = parseInt(req.params.id, 10);

  if (isNaN(jobId)) {
    return res.status(400).send('Invalid job ID');
  }

  try {
    await jobModel.updateJob(jobId, title, description, price, contact, req.session.userId);
    res.redirect('/jobs');
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).send('Server error');
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await jobModel.deleteJob(req.params.id, req.session.userId);
    res.redirect('/jobs');
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).send('Server error');
  }
};
