import { UsersService } from '../services/users.service'
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../utils/env'
;(async () => {
  try {
    console.log(await UsersService.get(ADMIN_USERNAME))
  } catch {
    await UsersService.create({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    })
  }
})()
