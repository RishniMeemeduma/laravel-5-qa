<?php

namespace App\Http\Controllers\Api;
use App\Answer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VoteAnswerController extends Controller
{


    public function __invoke(Answer $answer)
    {
        $vote = (int) request()->vote;

        $votesCount = auth()->user()->voteAnswer($answer, $vote);

        // return back();
        return response()->json([
            'votesCount'=> $votesCount,
            'message'=>'Thanks for the feedback']);
    }
}
