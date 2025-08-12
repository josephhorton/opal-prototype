// app/routes/reports.js
const crypto = require('crypto')

const READY_AFTER_MS = 3 * 1000

function getList(d, type) {
  d.reports = d.reports || {}
  d.reports[type] = d.reports[type] || []
  return d.reports[type]
}

function updateStatuses(d, type) {
  const list = getList(d, type)
  const now = Date.now()
  list.forEach(r => {
    if (r.status === 'In progress') {
      const created = new Date(r.createdAt).getTime()
      if (!Number.isNaN(created) && (now - created) >= READY_AFTER_MS) {
        r.status = 'Ready'
      }
    }
  })
}

function typeToTitle(type) {
  return ({
    'bank-list': 'Bank list'
  })[type] || type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

module.exports = (router) => {
  // Always refresh statuses when hitting any /reports/:type route
  router.all('/reports/:type*', (req, res, next) => {
    updateStatuses(req.session.data, req.params.type)

    // Move flash to locals for one-time display, then clear it
    res.locals.flash = req.session.data.flash
    req.session.data.flash = null

    next()
  })

  // Create
  router.post('/reports/:type/create', (req, res) => {
    const d = req.session.data
    const { type } = req.params
    const list = getList(d, type)
    const now = new Date()

    list.unshift({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: req.body.title || typeToTitle(type),
      businessUnit: d.businessUnit || '—',
      createdBy: d.user || 'jane.smith',
      status: 'In progress',
      createdAt: now.toISOString()
    })

    d.flash = { type: 'success', text: 'Report created' }
    res.redirect(`/reports/${type}`)
  })

  // Mark ready (manual)
  router.post('/reports/:type/:id/ready', (req, res) => {
    const list = getList(req.session.data, req.params.type)
    const item = list.find(r => r.id === req.params.id)
    if (item) item.status = 'Ready'
    res.redirect(`/reports/${req.params.type}`)
  })

  // Refresh (recompute ages -> statuses)
  router.post('/reports/:type/refresh', (req, res) => {
    updateStatuses(req.session.data, req.params.type)
    req.session.data.flash = { type: 'success', text: 'List updated' }
    res.redirect(`/reports/${req.params.type}`)
  })

  // Clear all for this type
  router.post('/reports/:type/clear', (req, res) => {
    if (req.session.data.reports && req.session.data.reports[req.params.type]) {
      req.session.data.reports[req.params.type] = []
    }
    res.redirect(`/reports/${req.params.type}`)
  })
}
