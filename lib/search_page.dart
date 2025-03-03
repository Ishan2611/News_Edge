import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  List searchResults = [];
  bool isLoading = false;
  int? selectedIndex; // Track selected news index for expanded view

  @override
  void initState() {
    super.initState();
    fetchRecentNews(); // Fetch latest news when page loads
  }

  Future<void> fetchRecentNews() async {
    await searchNews("latest");
  }

  Future<void> searchNews(String query) async {
    setState(() {
      isLoading = true;
      selectedIndex = null; // Reset expanded article when searching
    });

    final url = Uri.parse(
        'https://newsapi.org/v2/everything?q=$query&sortBy=publishedAt&apiKey=05e80915e833424499779414124e6a23');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        searchResults = data['articles'];
        isLoading = false;
      });
    } else {
      setState(() {
        isLoading = false;
      });
      throw Exception('Failed to load search results');
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
        title: const Text('Search News'),
        backgroundColor: Colors.deepPurple,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search for news...',
                hintStyle: TextStyle(color: Colors.white70),
                border: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.white),
                ),
                filled: true,
                fillColor: Colors.grey[900], // Dark input field
                suffixIcon: const Icon(Icons.search, color: Colors.white),
              ),
              style: const TextStyle(color: Colors.white), // White text input
              onSubmitted: (value) {
                if (value.isNotEmpty) {
                  searchNews(value);
                }
              },
            ),
          ),
          isLoading
              ? const Center(
                  child: CircularProgressIndicator(color: Colors.deepPurple))
              : Expanded(
                  child: ListView.builder(
                    itemCount: searchResults.length,
                    itemBuilder: (context, index) {
                      final article = searchResults[index];
                      return Column(
                        children: [
                          ListTile(
                            textColor: Colors.white, // White text color
                            leading: article['urlToImage'] != null &&
                                    article['urlToImage'].isNotEmpty
                                ? Image.network(
                                    article['urlToImage'],
                                    width: 80,
                                    height: 60,
                                    fit: BoxFit.cover,
                                    errorBuilder: (context, error, stackTrace) {
                                      return Image.asset(
                                        'assets/news_placeholder.png',
                                        width: 80,
                                        height: 60,
                                        fit: BoxFit.cover,
                                      );
                                    },
                                  )
                                : Image.asset(
                                    'assets/news_placeholder.png',
                                    width: 80,
                                    height: 60,
                                    fit: BoxFit.cover,
                                  ),
                            title: Text(article['title'] ?? 'No Title',
                                style: const TextStyle(color: Colors.white)),
                            subtitle: Text(
                                article['source']['name'] ?? 'Unknown',
                                style: const TextStyle(color: Colors.white70)),
                            trailing: Icon(
                              selectedIndex == index
                                  ? Icons.expand_less
                                  : Icons.expand_more,
                              color: Colors.deepPurple,
                            ),
                            onTap: () {
                              setState(() {
                                selectedIndex =
                                    selectedIndex == index ? null : index;
                              });
                            },
                          ),
                          if (selectedIndex == index)
                            Container(
                              color: Colors.grey[
                                  850], // Dark background for expanded news
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 16.0, vertical: 8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    article['content'] ??
                                        'No content available',
                                    style: const TextStyle(
                                        fontSize: 16, color: Colors.white70),
                                  ),
                                  const SizedBox(height: 10),
                                  ElevatedButton(
                                    onPressed: () {
                                      if (article['url'] != null) {
                                        _launchURL(article['url']);
                                      }
                                    },
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.deepPurple,
                                      foregroundColor: Colors.white,
                                    ),
                                    child: const Text('Read Full Article'),
                                  ),
                                  const Divider(color: Colors.white24),
                                ],
                              ),
                            ),
                        ],
                      );
                    },
                  ),
                ),
        ],
      ),
    );
  }
}
