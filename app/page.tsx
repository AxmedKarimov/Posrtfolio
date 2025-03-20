import Navbar from "./layout-pages/Navbar";
import SideBar from "./layout-pages/SideBar";

export default function Home() {
  return (
    <div className="w-full h-[666px] flex items-center justify-center">
      <div>
        <h1 className="text-center text-5xl font-bold text-white mb-4">
          Assalomu aleykum, Men <br />
          <span className="text-green-800">Karimov Axmed</span>
        </h1>
        <p className="text-center text-2xl text-neutral-300">
          Veb dasturchi va dizayner sifatida natijaga yo'naltirilgan ishchi.
          Veb- <br />
          saytlar va veb-ilovalarni yaratish va boshqarish orqali umumiy <br />
          mahsulot muvaffaqiyatiga erishish maqsadimdir.
        </p>
      </div>
    </div>
  );
}
