export interface ButtonProps {
	text: string
	type: 'primary' | 'default' | 'success'
	onClick?: () => void
}

export interface CardProps {
	title: string
	desc?: string
}

export interface ImageProps {
	src?: string
	alt: string
	width?: string | number
	height?: string | number
	radius?: 'sm' | 'md' | 'lg'
	fit?: 'cover' | 'contain' | 'fill'
}
