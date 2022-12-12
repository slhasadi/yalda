import { saveClicks } from "networks/activity";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { bookFileBaseURL } from "../../../../globals";
import styles from "../styles/Main.module.scss";

const Books = ({ audioFeed }: any) => {
  const [cookies] = useCookies(["token", "lnd_org"]);
  return (
    <section className={styles["main-books-container"]} id="book">
      <div className={styles["main-books-container-parent"]}>
        <div className="container block md:flex relative mx-auto lg:px-6 px-3 pt-10 pb-10">
          <div className={styles["main-books-content-parent"]}>
            <h3>{audioFeed[0].title}</h3>
            <span className="text-white">
              نویسنده : {audioFeed[0].links[0].title}
            </span>
            <span className="text-white">
              گوینده : {audioFeed[0].links[0].subtitle}
            </span>
            <h3>درباره کتاب</h3> 
            <p
              dangerouslySetInnerHTML={{
                __html: audioFeed[0].description,
              }}
            ></p>
            <Link href="/book">
              <a
                onClick={() =>
                  saveClicks(
                    "book",
                    "page",
                    cookies["lnd_org"],
                    cookies["token"]
                  )
                }
              >
                شنیدن کتاب
              </a>
            </Link>
          </div>
          <div className={styles["main-books-container-parent-image"]}>
            <Image
              src={bookFileBaseURL + audioFeed[0].cover}
              alt="game"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;
