import { Elysia, t } from 'elysia'
import Caching from './cashing'



export const file = new Elysia()

    .get('/:file', async ({ params: { file }, headers: { referer }, set }) => {
        const filePath = await Caching.getPhotoFromRedis(file)
        console.log(filePath)
        // MAKE SURE THAT YOU REPLACING YOUR PATH
        const pathToFile = import.meta.dirname.replace('/app/src',`/u/${filePath}`)
        console.log(pathToFile)
        const Bunfile = Bun.file(pathToFile)
        set.headers['Content-Type'] = 'image/jpeg'
        console.log(Bunfile)
        return Bunfile; 
    },
    { 
      params: t.Object({
        file: t.String({'pattern': '^[0-9]{1,7}$', enum: ['48378324']}),
        // file:  t.String({ enum: ['1708890608001.png'] }),
      }),
    }
    )

    .get('/product', async () => {
        const photo_info = ['a/1708972644923.png', 'a/1708962738660.png']
        const result = await Caching.setPhotoInCache(photo_info)
        return { data: result}
      }
      )

      .listen(3030)

console.log(
`🦊 Elysia is running at localhost:3030`
);
      