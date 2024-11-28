import { getHostname } from './getHostname';

interface generateLinkType {
	pathname: string;
	param: string;
}
export const generateLink = ({ pathname, param }: generateLinkType) => {
	const hostname = getHostname();
	const protocol = window.location.protocol;
	// const port = process.env.VITE_FRONTEND_PORT;
	return `${protocol}${hostname}/${pathname}/${param}`;
};
