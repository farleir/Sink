export default defineEventHandler(() => {
  return {
    status: 'ok',
    service: 'sink-router',
    timestamp: new Date().toISOString(),
    version: '0.2.0',
  }
})
