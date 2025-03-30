from flask import Flask, request, jsonify
import instaloader

app = Flask(__name__)

def get_instagram_video(url):
    L = instaloader.Instaloader()
    try:
        post = instaloader.Post.from_shortcode(L.context, url.split("/")[-2])
        return post.video_url if post.is_video else None
    except Exception as e:
        return str(e)

@app.route("/download", methods=["GET"])
def download():
    url = request.args.get("url")
    if not url:
        return jsonify({"error": "URL is required"}), 400
    
    video_url = get_instagram_video(url)
    if video_url:
        return jsonify({"video_url": video_url})
    return jsonify({"error": "Invalid Instagram video URL"}), 400

if __name__ == "__main__":
    app.run(debug=True)
