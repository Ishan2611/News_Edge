import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

class CategoriesPage extends StatefulWidget {
  const CategoriesPage({Key? key}) : super(key: key);

  @override
  _CategoriesPageState createState() => _CategoriesPageState();
}

class _CategoriesPageState extends State<CategoriesPage> {
  final List<String> categories = [
    'Sports',
    'Business',
    'Technology',
    'Health',
    'Science',
    'Entertainment'
  ];
  List articles = [];
  String selectedCategory = 'Sports';

  @override
  void initState() {
    super.initState();
    fetchNews(selectedCategory);
  }

  Future<void> fetchNews(String category) async {
    final encodedUrl = Uri.encodeComponent(
        'https://newsapi.org/v2/top-headlines?country=us&category=$category&apiKey=05e80915e833424499779414124e6a23');
    final url = Uri.parse('https://api.allorigins.win/raw?url=$encodedUrl');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        articles = data['articles'];
        selectedCategory = category;
      });
    } else {
      throw Exception('Failed to load news');
    }
  }

  void _launchURL(String url) async {
    final Uri uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black, // Dark background
      appBar: AppBar(
        title: const Text(
          'News Categories',
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
        backgroundColor: Colors.deepPurple,
        centerTitle: true,
      ),
      body: Column(
        children: [
          // Category Buttons
          SizedBox(
            height: 50,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final category = categories[index];
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: selectedCategory == category
                          ? Colors.deepPurpleAccent
                          : Colors.grey[800],
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    onPressed: () {
                      fetchNews(category.toLowerCase());
                    },
                    child: Text(category),
                  ),
                );
              },
            ),
          ),

          // News List
          Expanded(
            child: articles.isEmpty
                ? const Center(
                    child: CircularProgressIndicator(color: Colors.deepPurple))
                : ListView.builder(
                    padding: const EdgeInsets.all(10),
                    itemCount: articles.length,
                    itemBuilder: (context, index) {
                      final article = articles[index];
                      return NewsCard(
                        title: article['title'] ?? 'No Title',
                        source: article['source']['name'] ?? 'Unknown Source',
                        date: article['publishedAt']?.substring(0, 10) ??
                            'Unknown Date',
                        description: article['description'] ??
                            'No description available.',
                        imageUrl: article['urlToImage'],
                        url: article['url'],
                        onReadMore: () => _launchURL(article['url']),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

// Reusable News Card Component
class NewsCard extends StatelessWidget {
  final String title;
  final String source;
  final String date;
  final String description;
  final String? imageUrl;
  final String? url;
  final VoidCallback onReadMore;

  const NewsCard({
    Key? key,
    required this.title,
    required this.source,
    required this.date,
    required this.description,
    this.imageUrl,
    this.url,
    required this.onReadMore,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.grey[900], // Dark card background
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      elevation: 4,
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (imageUrl != null)
            ClipRRect(
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(15), topRight: Radius.circular(15)),
              child: Image.network(
                imageUrl!,
                height: 200,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) => Image.asset(
                  'assets/news_placeholder.png',
                  height: 200,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
                const SizedBox(height: 5),
                Text(
                  '$source • $date',
                  style: const TextStyle(fontSize: 14, color: Colors.white70),
                ),
                const SizedBox(height: 10),
                Text(
                  description,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(fontSize: 14, color: Colors.white70),
                ),
                const SizedBox(height: 10),
                Align(
                  alignment: Alignment.centerRight,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.deepPurpleAccent,
                      foregroundColor: Colors.white,
                    ),
                    onPressed: onReadMore,
                    child: const Text('Read More'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
