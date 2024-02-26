import { createClient } from 'redis';

const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();
  


class Caching {

    async setPhotoInCache(data: string | string[]) {
        let path: string[] = []
        if (Array.isArray(data)) {
            const multi = client.multi();
            data.forEach((element: string) => {
                const randomNumber = Math.floor(Math.random() * 10000000).toString();
                path.push(randomNumber)
                multi.set(randomNumber, element, {EX: 180, NX: true});
            });
            await multi.exec()
            
        } else {
            const randomNumber = Math.floor(Math.random() * 10000000).toString();
            path.push(randomNumber)
            await client.set(randomNumber, data, {EX: 180, NX: true});
        }
        return path
    }

    async getPhotoFromRedis(key: string) {
        const multi = client.multi();
        multi.get(key)
        multi.del(key)
        const result = await multi.exec()
        console.log(result)
        return result
    }

}

export default new Caching();