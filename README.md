# Deployment part 2: TypeScript, Git และ GitHub Actions

โปรเจกต์นี้ทำตามตัวอย่างใน `สำเนาของ part2.pdf` หน้า 9–16 และ 33–58 โดยมี Express server, TypeScript build, nodemon, unit test และ GitHub Actions

## รันในเครื่อง

```bash
npm ci
npm run dev
```

เปิด `http://localhost:3000` จะเห็น `Hello, World!` ถ้าพอร์ต 3000 ถูกใช้งาน ให้รัน `PORT=3001 npm run dev` และเปิดพอร์ต 3001 แทน

```bash
npm run build
npm start
npm test
```

`npm run build` สร้าง JavaScript ใน `dist/` ส่วน `npm test` build แล้วทดสอบ `Utils.add()` ด้วย exit status ที่ GitHub Actions ตรวจจับได้

## Git และ CI

Repository นี้เริ่มต้นบน branch `main` แล้ว เมื่อมี GitHub repository ปลายทางจึงเพิ่ม `origin` และ push `main` ได้ ไฟล์ `.github/workflows/ci.yml` จะทำงานเมื่อ push ไป `main` หรือเปิด pull request โดยติดตั้ง dependency, build และทดสอบบน Ubuntu

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
