const plansService = require("./plans.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function planExists(req, res, next) {
  const plan = await plansService.read(req.params.planId);
  if (plan) {
    res.locals.plan = plan;
    return next();
  }
  next({ status: 404, message: `Plan cannot be found.` });
}


async function list(req, res) {
  const data = await plansService.list();
  res.json({ Plans: data});
}

function read(req, res, next) {
  const { plan } = res.locals;
  res.json({ plan: plan });
}

async function create(req, res) {
  const plan = await plansService.create(req.body);
  res.status(201).json({ plan });
}

async function destroy(req, res) {
  await plansService.destroy(res.locals.plan.id);
  res.sendStatus(204);
}





module.exports = {
  read: [asyncErrorBoundary(planExists), read],
  list: [asyncErrorBoundary(list)],
  destroy: [asyncErrorBoundary(planExists), asyncErrorBoundary(destroy)],
  create: [asyncErrorBoundary(create)],

};
