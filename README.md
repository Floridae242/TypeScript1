# Deployment part 2–3: TypeScript, GitHub Actions และ MongoDB

โปรเจกต์นี้ทำตามตัวอย่างใน `สำเนาของ part2.pdf` และ `สำเนาของ part3.pdf` โดยมี Express server, TypeScript build, unit test, GitHub Actions และ User API ที่ใช้ MongoDB

## รันในเครื่อง

```bash
npm ci
cp -n .env.example .env
npm run dev
```

แก้ `MONGODB_URI` ใน `.env` ให้เป็น connection string ของ MongoDB Atlas หรือ MongoDB ในเครื่องก่อนรัน server (`.env` ถูก ignore โดย Git) จากนั้นเปิด `/test.html` บนพอร์ตที่ตั้งไว้ใน `PORT` เพื่อทดลองเพิ่มผู้ใช้ หากพอร์ต 3000 ถูกใช้งาน ให้เปลี่ยน `PORT` ใน `.env`

```bash
npm run build
npm start
npm test
```

`npm run build` สร้าง JavaScript ใน `dist/` ส่วน `npm test` build แล้วทดสอบ `Utils.add()` ด้วย exit status ที่ GitHub Actions ตรวจจับได้

## User API จาก part 3

| Method | URL | งาน |
| --- | --- | --- |
| POST | `/api/users` | สร้างผู้ใช้ด้วย `name`, `email`, `password` |
| GET | `/api/users` | ดูผู้ใช้ทั้งหมด |
| GET | `/api/users/:id` | ดูผู้ใช้ตาม ID |
| PUT | `/api/users/:id` | แก้ไขผู้ใช้ |
| DELETE | `/api/users/:id` | ลบผู้ใช้ |

ตัวอย่างส่งข้อมูล:

```bash
curl -X POST http://localhost:3000/api/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"A","email":"a@example.com","password":"example123"}'
```

รหัสผ่านถูก hash ก่อนบันทึก และ API ไม่ส่งรหัสผ่านกลับมา ตัวอย่างนี้ใช้ฝึกในเครื่อง ยังไม่มีระบบ login หรือสิทธิ์ผู้ใช้

## Docker จาก part 3

หลังเปิด Docker Desktop แล้ว ลองคำสั่งพื้นฐานจากสไลด์:

```bash
docker --version
docker image ls
docker container ls
docker run --rm hello-world
```

หากต้องการทดลอง MongoDB ในเครื่อง สามารถใช้ `MONGODB_URI=mongodb://127.0.0.1:27017/typescript1` ใน `.env` เมื่อมี MongoDB ที่รันอยู่ หรือใช้ MongoDB Atlas ตามสไลด์

## Git และ CI

เมื่อ push ไป `main`, Workflow 1 จะติดตั้ง dependency และรัน test พอ Workflow 1 จบ Workflow 2, 3 และ 4 จะเริ่มแยกกันตามตัวอย่างในสไลด์

ตัวอย่างการตรวจและจัดการเวอร์ชันจากหน้า 7–8, 16–17, 28–31:

```bash
git status
git log --oneline
git switch -c feature/example
git switch main
git merge feature/example
git revert <commit-id>
```

คำสั่ง rollback ในสไลด์เป็นตัวอย่างสำหรับศึกษา การใช้ `git reset --hard` จะลบการแก้ไขในเครื่อง จึงควรตรวจสถานะและ commit ที่ต้องการก่อนทุกครั้ง

สไลด์หน้า 15 ยกตัวอย่าง `.gitignore` ที่เก็บเฉพาะ `dist/index.js` แต่ GitHub Actions ในหน้า 35–58 ต้องใช้ source, package files และ workflow ด้วย โปรเจกต์นี้จึงเก็บไฟล์เหล่านั้น รวมถึง `dist/` ตามตัวอย่าง build และไม่เก็บ `node_modules/`

สไลด์หน้า 20–27 แสดงการเพิ่ม collaborator และการแก้ปัญหา SSH ใน GitHub Desktop ขั้นตอนเหล่านี้ใช้เฉพาะเมื่อมี repository และผู้ร่วมงานจริง ไม่ต้องคัดลอก `.git` จาก repository อื่น
