import styled from "styled-components";
import { AnimatePresence, m, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background:linear-gradient(135deg,rgb(238, 0, 153),rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
	width: 400px;
	height: 400px;
	background-color: rgba(255,255,255,1);
	border-radius: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 3px rgba(0,0,0,0.1) , 0 10px 20px rgba(0,0,0,0.1);
`

const Circle = styled(motion.div)`
	background-color: #00a5ff;
	width: 100px;
	height: 100px;
	border-radius: 50px;
	box-shadow: 0 2px 3px rgba(0,0,0,0.1) , 0 10px 20px rgba(0,0,0,0.1);

`

export default function App() {
	const [clicked, setClicked] = useState(false);
	const toggleClick = () => setClicked(prev => !prev);
	return (
		<Wrapper onClick={toggleClick}>
			<Box>
				{!clicked ? <Circle layoutId="circle" style={{ borderRadius: 50 }} /> : null}
			</Box>
			<Box>
				{clicked ? <Circle layoutId="circle" style={{ borderRadius: 0, scale: 2 }} /> : null}
			</Box>
		</Wrapper>
	);
}
