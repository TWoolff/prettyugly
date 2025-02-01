"use client";
import { AnimatePresence } from "framer-motion";
import { useAppContext } from "./context";
import useCustomCursor from "./utils/useCustomCursor";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Loader from "./components/loader/loader";

type TemplateProps = {
	children: React.ReactNode;
};

const Template: React.FC<TemplateProps> = ({ children }) => {
	const { state } = useAppContext();
	useCustomCursor();

	return (
		<>
			<AnimatePresence>{!state.hasLoaded && <Loader />}</AnimatePresence>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Template;
