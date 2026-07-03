def calculate_quality_score(data, statistics):

    score = 100

    score -= len(data["duplicates"]) * 5

    score -= len(data["missing_values"]) * 2

    score -= len(data["invalid_emails"]) * 3

    score -= len(data["negative_values"]) * 3

    score -= len(data["future_dates"]) * 3

    column_scores = []

    for column in statistics["column_profile"].values():

        column_scores.append(column["quality_score"])

    if column_scores:

        average = sum(column_scores) / len(column_scores)

        score = (score + average) / 2

    return round(max(score, 0), 2)