import { ImageResponse } from "next/og";

export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#1c1917',
                    borderRadius: '8px',
                }}
            >
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path
                        d="M12 2.5C10.5 5.5 10 8.5 12 11.5C14 8.5 13.5 5.5 12 2.5Z"
                        fill="#d97706"
                        fillOpacity="0.35"
                    />
                    <path
                        d="M12 11.5C9.5 9.8 7.2 10.2 6 12C7.2 14.5 9.8 15.2 12 13.5"
                        fill="#d97706"
                        fillOpacity="0.2"
                    />
                    <path
                        d="M12 11.5C14.5 9.8 16.8 10.2 18 12C16.8 14.5 14.2 15.2 12 13.5"
                        fill="#d97706"
                        fillOpacity="0.2"
                    />
                    <path d="M12 11.5C9.8 8 7 7.2 4.8 8.8C5.5 12.2 9 14 12 13" />
                    <path d="M12 11.5C14.2 8 17 7.2 19.2 8.8C18.5 12.2 15 14 12 13" />
                    <path d="M8 15C5.5 14.5 3.5 15.5 3 17C5.5 18.5 8.5 18 10 16" />
                    <path d="M16 15C18.5 14.5 20.5 15.5 21 17C18.5 18.5 15.5 18 14 16" />
                    <circle cx="12" cy="11.2" r="1.1" fill="#d97706" />
                    <path d="M5 20.5C9 21.5 15 21.5 19 20.5" strokeWidth="1.3" opacity="0.7" />
                </svg>
            </div>
        ),
        { ...size }
    )
}