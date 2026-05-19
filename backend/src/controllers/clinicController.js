/**
 * QueueEase V2 — Clinic Controller
 */

const Clinic = require('../models/Clinic');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * @desc    Create clinic
 * @route   POST /api/clinics
 * @access  Private (Doctor)
 */
exports.createClinic = async (req, res, next) => {
  try {
    const clinicData = { ...req.body, doctorId: req.user._id };
    const clinic = await Clinic.create(clinicData);
    sendSuccess(res, clinic, 'Clinic created successfully', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all clinics
 * @route   GET /api/clinics
 * @access  Public
 */
exports.getClinics = async (req, res, next) => {
  try {
    const { city, district, specialty, search, page = 1, limit = 20 } = req.query;
    
    const filter = { isActive: true };
    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (district) filter['address.district'] = new RegExp(district, 'i');
    if (specialty) filter.specialty = new RegExp(specialty, 'i');
    if (search) filter.name = new RegExp(search, 'i');
    
    const clinics = await Clinic.find(filter)
      .populate('doctorId', 'name specialization')
      .sort({ 'rating.average': -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    
    const total = await Clinic.countDocuments(filter);
    
    sendSuccess(res, { clinics, total, page: Number(page), pages: Math.ceil(total / limit) }, 'Clinics retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get clinic by ID
 * @route   GET /api/clinics/:id
 * @access  Public
 */
exports.getClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findById(req.params.id)
      .populate('doctorId', 'name specialization phone')
      .populate('receptionistIds', 'name phone');
    
    if (!clinic) {
      return sendError(res, 'Clinic not found', 404);
    }
    
    sendSuccess(res, clinic, 'Clinic retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update clinic
 * @route   PUT /api/clinics/:id
 * @access  Private (Doctor — owner)
 */
exports.updateClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return sendError(res, 'Clinic not found', 404);
    }
    
    // Only owner doctor can update
    if (clinic.doctorId.toString() !== req.user._id.toString()) {
      return sendError(res, 'Not authorized to update this clinic', 403);
    }
    
    const updated = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    sendSuccess(res, updated, 'Clinic updated');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get my clinics (doctor's clinics)
 * @route   GET /api/clinics/my
 * @access  Private (Doctor)
 */
exports.getMyClinics = async (req, res, next) => {
  try {
    const clinics = await Clinic.find({ doctorId: req.user._id });
    sendSuccess(res, clinics, 'Your clinics retrieved');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add receptionist to clinic
 * @route   POST /api/clinics/:id/receptionist
 * @access  Private (Doctor — owner)
 */
exports.addReceptionist = async (req, res, next) => {
  try {
    const { receptionistId } = req.body;
    const clinic = await Clinic.findById(req.params.id);
    
    if (!clinic) {
      return sendError(res, 'Clinic not found', 404);
    }
    
    if (clinic.doctorId.toString() !== req.user._id.toString()) {
      return sendError(res, 'Not authorized', 403);
    }
    
    if (clinic.receptionistIds.includes(receptionistId)) {
      return sendError(res, 'Receptionist already added', 409);
    }
    
    clinic.receptionistIds.push(receptionistId);
    await clinic.save();
    
    sendSuccess(res, clinic, 'Receptionist added');
  } catch (error) {
    next(error);
  }
};
