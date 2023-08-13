/* eslint-disable react/prop-types */
export function DisplayScores({ score, highScore }) {
    return (
        <div className="stats shadow overflow-hidden">
            <div className="stat place-items-center">
                <div className="underline text-lg">Current Score</div>
                <div className="text-secondary stat-value">{score}</div>
            </div>

            <div className="stat place-items-center">
                <div className="stat place-items-center">
                    <div className="underline text-lg">Highscore</div>
                    <div className="text-secondary stat-value">{highScore}</div>
                </div>
            </div>
        </div>
    );
}
