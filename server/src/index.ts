import { server } from './server'
import { PORT } from './utils/env'

// Start server
server.listen(PORT, () => {
  console.log(`Server is running, listening on PORT: ${PORT}`)
})
